from motor.motor_asyncio import AsyncIOMotorClient
from models import Task
from bson import ObjectId

client = AsyncIOMotorClient('mongodb://localhost')
database = client.taskdatabase
collection = database.tasks

#get 1 - GET
async def get_one_task_id(id):
    task = await collection.find_one({'_id': ObjectId(id)})
    return task

#get 1 - GET
async def get_one_task(title):
    task = await collection.find_one({'title': title})
    return task

#get all - GET
async def get_all_tasks():
    tasks = []
    cursor =  collection.find({})
    async for document in cursor:
        tasks.append(Task(**document))
    return tasks

#create - POST
async def create_task(task):
    new_task = await collection.insert_one(task)
    created_task = await collection.find_one({'_id': new_task.inserted_id})
    return created_task

#update - PUT
async def update_task(id:str, data):
    task = {k:v for k, v in data.dict().items() if v is not None}
    await collection.update_one({'_id': ObjectId(id)}, {'$set':task})
    document = await collection.find_one({'_id': ObjectId(id)})
    return document

#delete - DELETE
async def delete_task(id:str):
    await collection.delete_one({'_id': ObjectId(id)})
    return True
