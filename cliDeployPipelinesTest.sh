#!/bin/bash -e
Application=chron
BranchName=test
StackName=${Application}CodeBuild${BranchName}
ParentVPCStack=icttestawsvpc
Environment=T

aws cloudformation deploy --template-file infra.yaml --capabilities CAPABILITY_IAM --parameter-overrides Environment=${Environment} Application=${Application} ParentVPCStack=${ParentVPCStack} BranchName=${BranchName} --stack-name ${StackName}