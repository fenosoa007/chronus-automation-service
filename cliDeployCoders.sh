make -f MakeFile || exit
# export AWS_PROFILE=saml

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

CODERS_AWS_BUCKET="aws-sam-cli-managed-default-samclisourcebucket-1tlgadg2mgnuo"
sam build -b ./build -t ./template.yaml
sam package --template-file build/template.yaml --output-template-file packaged.yaml --s3-bucket $CODERS_AWS_BUCKET
rm -fr ./build
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name chron --parameter-overrides ChronousBaseURL=$CHRONUS_BASE_URL  ChronousAPIKey=$CHRONUS_API_KEY Email=$Email EmailPassword=$EmailPassword
rm packaged.yaml