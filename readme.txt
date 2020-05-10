AWS script has a single variable tablename

E.g. Running it.
aws cloudformation package --template-file template.yml --output-template-file package.yml --s3-bucket yshyunasamtest

aws cloudformation deploy --template-file C:\Users\yanek\Documents\AWS\todo-hyuna\package.yml --stack-name todostack --capabilities CAPABILITY_NAMED_IAM --parameter-overrides TableName=todohyuna