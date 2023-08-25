#!/bin/bash -e
Application=chron
BranchName=master
StackName=${Application}CodeBuild${BranchName}
ParentVPCStack=ictprodawsvpc
Environment=P

aws cloudformation deploy --template-file infra.yaml --capabilities CAPABILITY_IAM --parameter-overrides Environment=${Environment} Application=${Application} ParentVPCStack=${ParentVPCStack} BranchName=${BranchName} --stack-name ${StackName}