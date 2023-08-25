#!/bin/bash -e
Application=chron
BranchName=develop
StackName=${Application}CodeBuild${BranchName}
ParentVPCStack=ictdevawsvpc
Environment=D

aws cloudformation deploy --template-file infra.yaml --capabilities CAPABILITY_IAM --parameter-overrides Environment=${Environment} Application=${Application} ParentVPCStack=${ParentVPCStack} BranchName=${BranchName} --stack-name ${StackName}