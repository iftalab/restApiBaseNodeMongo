import os

#change this part as per your requierments 
schemaFields=[
    'name : String',
    'phone : String',
    'username : String',
    'password : String',
    'email : String',
    'userType : String',
    'factoryName : String',
]
desiredApiName = 'user'

#no need to change below codes
schemaGenerationMatcher = "updated : {type : Date, default : Date.now},"
putMethodMatcher = "_id: mongoose.Types.ObjectId(),"
sourceApiName = 'base'
sourceModel = open(os.getcwd()+'\\v1\\model\\'+sourceApiName+'.js','r')
resultModel = open(os.getcwd()+'\\v1\\model\\'+desiredApiName+'.js','w+')
lines = [line.rstrip('\n') for line in sourceModel]
for line in lines:
    line = line.replace(sourceApiName,desiredApiName)
    line = line.replace(sourceApiName.capitalize(),desiredApiName.capitalize())
    resultModel.write(line+'\n')
    if(line.endswith(schemaGenerationMatcher)):
       for field in schemaFields:
            resultModel.write('\t'+field+',\n')
   
sourceModel.close()
resultModel.close()

sourceRoute = open(os.getcwd()+'\\v1\\route\\'+sourceApiName+'.js','r')
resultRoute = open(os.getcwd()+'\\v1\\route\\'+desiredApiName+'.js','w+')
lines = [line.rstrip('\n') for line in sourceRoute]
for line in lines:
    line = line.replace(sourceApiName,desiredApiName)
    line = line.replace(sourceApiName.capitalize(),desiredApiName.capitalize())
    resultRoute.write(line+'\n')
    if(line.endswith(putMethodMatcher)):
       for field in schemaFields:
           fieldName = field.split(" : ")[0];
           resultRoute.write('\t\t'+fieldName+' : req.body.'+fieldName+',\n')




sourceRoute.close()
resultRoute.close()
print 'done'
