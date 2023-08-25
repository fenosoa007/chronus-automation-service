APPLICATION:=chron
ENVIRONMENT?=
CODE_BUCKET?=
PARENT_VPC_STACK?=
BRANCH_NAME?=

help: ## Display this help screen
	grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

coders: ## Deploy to Coders
	make deploy ENVIRONMENT=C CODE_BUCKET=cf-templates-u6grlzjqw4qg-ap-southeast-2

ssm:
	make put-ssm OUTPUT_KEY=GetBannersFunctionApiEndPoint ENVIRONMENT=C
	make put-ssm OUTPUT_KEY=PostBannerFunctionApiEndPoint ENVIRONMENT=C

put-ssm:
	aws cloudformation describe-stacks --stack-name ${APPLICATION} --query "Stacks[0].Outputs[?OutputKey=='${OUTPUT_KEY}'].OutputValue" --output text|xargs aws ssm put-parameter --name "/${APPLICATION}/${ENVIRONMENT}/${OUTPUT_KEY}" --type "String" --overwrite --value 

packaged.yaml: template.yaml ## Create packaged.yaml
	sam build -s src/ -m package.json -b ./build -t ./template.yaml
	sam package --template-file build/template.yaml --output-template-file packaged.yaml --s3-bucket ${CODE_BUCKET}
	rm -fr ./build

deploy: packaged.yaml ## Deploy to ENVIRONMENT
	sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name ${APPLICATION}
	rm packaged.yaml

codebuild-dev: ## Deploy CodeBuild to Dev
	make codebuild ENVIRONMENT=D BRANCH_NAME=develop PARENT_VPC_STACK=ictdevawsvpc

codebuild-test: ## Deploy CodeBuild to Test
	make codebuild ENVIRONMENT=T BRANCH_NAME=test PARENT_VPC_STACK=icttestawsvpc

codebuild-prod: ## Deploy CodeBuild to Prod
	make codebuild ENVIRONMENT=P BRANCH_NAME=master PARENT_VPC_STACK=ictprodawsvpc

codebuild: ## Deploy CodeBuild to ENVIRONMENT, BRANCH_NAME and PARENT_VPC_STACK
	aws cloudformation deploy --template-file infra.yaml --capabilities CAPABILITY_IAM --parameter-overrides Environment=${ENVIRONMENT} Application=${APPLICATION} ParentVPCStack=${PARENT_VPC_STACK} BranchName=${BRANCH_NAME} --stack-name ${APPLICATION}CodeBuild${BRANCH_NAME}

