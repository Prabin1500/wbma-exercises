import { useContext, useEffect, useState } from 'react';
import { baseUrl, appId } from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

const doFetch = async (url, options) => {
    const response = await fetch(url, options);
    const json = await response.json();
    if(!response.ok){
      const message = json.error ? `${json.message} : ${json.error}` : json.message;
      throw new Error(message || response.statusText);
    }

    return json;
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method : 'post',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(userCredentials),
    };
    try {
      return await doFetch(baseUrl + 'login', options);

    } catch (error) {
      throw new Error('postLogin: ' + error.message);
    }
  };
  return {postLogin}
};


const useUser = () => {

  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      return await doFetch(baseUrl + 'users/user', options);

    } catch (error) {
      throw new Error('checkUser' + error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method : 'post',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);

    } catch (error) {
      throw new Error ('Post User: ' +error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('Check username ' + error.message);
    }
  };

  const getUserById = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'users/' + id, {
        headers : {'x-access-token': token}
      });
    } catch (error) {
      throw new Error('getUserById ' + error.message);
    }
  }

  return {getUserByToken, postUser, checkUsername, getUserById};
};

const useMedia = (myFilesOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update, user} = useContext(MainContext);

  const loadmedia = async() => {
    try{
      //const response = await fetch(baseUrl + 'media');
      //const json = await response.json();
      let json = await useTag().getFilesByTag(appId);

      if(myFilesOnly){
        json = json.filter((file) => file.user_id === user.user_id);
      }

      json.reverse();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
      })
    );
    setMediaArray(media);

    }catch(error){
      console.error('List, loadMedia', error)
    };

  };

  useEffect(() => {
    loadmedia();
  }, [update]);

  const postMedia = async(fileData,token) => {
    const options = {
      method : 'post',
      headers : {
        'x-access-token': token,
        'Content-Type' : 'multipart/form-data',
      },
      body : fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);

    } catch (error) {
      throw new Error('post Media: ' + error.message);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'media/' + id, {
        headers : {'x-access-token': token},
        method : 'delete',
      });
    } catch (error) {
      throw new Error('delete Media ' + error.message);

    };
  };

  const putMedia = async (id, data, token) => {
    const options = {
      method : 'put',
      headers : {
        'x-access-token': token,
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'media/' + id, options);

    } catch (error) {
      throw new Error('put Media: ' + error.message);
    }
  };

  return {mediaArray, postMedia, deleteMedia, putMedia};
};

const useTag = () => {

  const getFilesByTag = async (tag) => {
    try{
      return await doFetch(baseUrl + 'tags/' + tag);
    }catch(error){
      throw new Error('getFilesByTag', error.message);
    }
  };

  const postTag = async(data, token) => {

    const options = {
      method:'post',
      headers:{
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
        throw new Error('postTag: ' + error.message);
    }

  };

  return {getFilesByTag, postTag};
};

const useFavourite = () => {

  const postFavourite = async(fileId, token) => {
    const options = {
      method:'post',
      headers:{
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id:fileId}),
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
        throw new Error('postFavourite: ' + error.message);
    }
  };

  const getFavouritesByFileId = async(fileId) => {
    try{
      return await doFetch(baseUrl + 'favourites/file/' + fileId);
    }catch(error){
      throw new Error('getFavouriteByFileId: ', error.message);
    }
  };

  const getFavouritesByUser = async(token) => {

  };

  const deleteFavourite = async(fileId, token) => {
    const options = {
      method:'delete',
      headers:{
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
        throw new Error('deleteFavourite: ' + error.message);
    }
  };

  return {postFavourite, getFavouritesByUser, getFavouritesByFileId, deleteFavourite}
};

export {useMedia, useAuthentication, useUser, useTag, useFavourite};
