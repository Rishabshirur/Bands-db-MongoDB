// TODO: Export and implement the following functions in ES6 format
import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

export const create = async (
  name,   
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  if (!name|| !genre|| !website|| !recordCompany|| !groupMembers|| !yearBandWasFormed) throw 'You must provide all the parameters';
  if (typeof name!=='string'|| typeof website!=='string'|| typeof recordCompany!=='string') throw 'Name ,website and recordcompany must be a string';
  if (name.trim().length === 0|| website.trim().length===0|| recordCompany.trim().length===0) throw 'Name or website or recordCompany cannot be an empty string or string with just spaces';
  if (!Array.isArray(genre)|| !Array.isArray(groupMembers)) throw 'genre and groupMembers must be arrays';
  if (genre.length===0 || groupMembers.length===0 ) throw 'You must supply at least one genre and groupmember';
  for (let i in genre) {
    if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) throw 'One or more genre is not a string or is an empty string';
    genre[i] = genre[i].trim();
  }
  for (let i in groupMembers) {
    if (typeof groupMembers[i] !== 'string' || groupMembers[i].trim().length === 0) throw 'One or more groupmembers is not a string or is an empty string';
    groupMembers[i] = groupMembers[i].trim();
  }
  if(typeof yearBandWasFormed!=='number' || (yearBandWasFormed < 1900 || yearBandWasFormed > 2023)) throw 'yearBandWasFormed must be a number between 1900-2023';
  if(!(/^(http:\/\/www\.)[a-zA-Z]{5,}(\.com)$/.test(website))){ throw "invalid website format";}
  name = name.trim();
  website = website.trim();
  recordCompany = recordCompany.trim();

  let newband={
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed
  }
  const bandcollection= await bands();
  const insertInfo = await bandcollection.insertOne(newband);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add band';
  const newId = insertInfo.insertedId.toString();
  const band = await get(newId);
  return band;
};

export const getAll = async () => {
  const bandCollection = await bands();
  let bandList = await bandCollection.find({}).toArray();
  if (!bandList) throw 'Could not get all bands';
  bandList = bandList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return bandList;
};

export const get = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const bandCollection = await bands();
  const band = await bandCollection.findOne({_id: new ObjectId(id)});
  if (band === null) throw 'No band with that id';
  band._id = band._id.toString();
  return band;
};

export const remove = async (id) => {
  if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const bandCollection = await bands();
  const deletionInfo = await bandCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (deletionInfo.lastErrorObject.n === 0) {
    throw `Could not delete band with id of ${id}`;
  }
  return `${deletionInfo.value.name} has been successfully deleted!`;
};

export const rename = async (id, newName) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  if (!newName) throw 'You must provide a name for the band';
  if (typeof newName !== 'string') throw 'Name must be a string';
  if (newName.trim().length === 0)
    throw 'Name cannot be an empty string or string with just spaces';
  newName = newName.trim();
  const updatedBand = {
    name: newName,
  };
  const bandCollection = await bands();
  const updatedInfo = await bandCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: updatedBand},
    {returnDocument: 'after'}
  );
  if (updatedInfo.lastErrorObject.n === 0) {
    throw 'could not update band successfully';
  }
  updatedInfo.value._id = updatedInfo.value._id.toString();
  return updatedInfo.value;
};
