make -f MakeFile || exit
export AWS_PROFILE=saml

if [ -z "$1" ]; then
    echo "BranchName (coders, master, dev, test, etc)"
    read BranchName
else
    BranchName=$1
fi

constants=$(cat cicd.param.${BranchName}.json | jq '.Parameters' | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]")
for key in ${constants}; do
    eval ${key}
    variables=${variables}" "${key}
done


StackName=chron
echo $StackName


userpoolid=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`CognitoUserPoolId`].OutputValue' --output text)
appclientid=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`CognitoUserPoolClientId`].OutputValue' --output text)
uploadurl=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`PostBannerFunctionApiEndPoint`].OutputValue' --output text)
cognitodomain=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`CognitoUserPoolDomain`].OutputValue' --output text)
cloudfronturl=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`S3CloudFrontUrl`].OutputValue' --output text)
region=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`Region`].OutputValue' --output text)

echo "
REACT_APP_AWS_UPLOAD_URL=$uploadurl
REACT_APP_AWS_CLOUDFRONT_URL=$cloudfronturl
REACT_APP_AWS_REGION=$region
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID=ap-southeast-2:8bceb87f-2bb6-43ce-9f83-39ebb5118655
REACT_APP_AWS_USER_POOLS_ID=$userpoolid
REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID=$appclientid
REACT_APP_OAUTH_DOMAIN=$cognitodomain
REACT_APP_OAUTH_SCOPE=openid
REACT_APP_OAUTH_REDIRECT_SIGNIN=$cloudfronturl
REACT_APP_OAUTH_REDIRECT_SIGNOUT=$cloudfronturl
REACT_APP_OAUTH_RESPONSE_TYPE=token
REACT_APP_FEDERATION_TARGET=COGNITO_USER_POOLS" > frontEnd/s3-upload-lambda-ui/.env

# Deploy website

yarn --cwd frontEnd/s3-upload-lambda-ui build

websitebucket=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)
aws s3 cp frontEnd/s3-upload-lambda-ui/build s3://$websitebucket --recursive --exclude "*.DS_Store" --cache-control public,max-age=604800

cloudfront=$(aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistribution`].OutputValue' --output text)
aws cloudfront create-invalidation --distribution-id $cloudfront --paths '/*'

echo "AWS Region: $region"
echo "Cognito Domain: $cognitodomain"
echo "Upload API: $uploadurl"
echo "UserPool ID: $userpoolid"
echo "App Client ID: $appclientid"
echo "UI URL: $cloudfronturl"