import axios from "axios";
import Cookies from "js-cookie";
import Content from "../models/ContentModel";

const CONTENT_API_BASE_URL = "http://localhost:8080/nfc-learning";
const VERSION_URI = CONTENT_API_BASE_URL + "/v1";
const CONTENT_URI = VERSION_URI + "/content";
const GET_ALL_URI = CONTENT_URI + "/list";
const GET_BY_ID = CONTENT_URI + "/find-by-id";
const CREATE_CONTENT = CONTENT_URI + "/create";
const UPDATE_CONTENT = CONTENT_URI + "/update";
const DELETE_CONTENT_URI = CONTENT_URI + "/delete";
const GET_ALL_NOT_ASSOCIATED_CONTENT_URI = CONTENT_URI + "/list-no-association-lesson";



const token = Cookies.get("jwt-token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const getContents = async () => {
    try {
        const response = await axios.get(GET_ALL_URI, config);
        return response.data;
    } catch (error) {
        console.error("Error getting contents:", error);
        throw error;
    }
};

const getContentsWithoutLessonAssociated = async () => {
    try {
        const response = await axios.get(GET_ALL_NOT_ASSOCIATED_CONTENT_URI, config);
        return response.data;
    } catch (error) {
        console.error("Error getting contents:", error);
        throw error;
    }
};

const getContentById = async (contentId: number | undefined) => {
    try {
        const response = await axios.get(GET_BY_ID + "/" + contentId, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error getting content by ID:", error);
        throw error;
    }
};

const createContent = async (content: Content) => {
    try {
        const response = await axios.post(CREATE_CONTENT, content, config);
        return response.data;
    } catch (error) {
        console.error("Error creating content:", error);
        throw error;
    }
};

const updateContent = async (contentId: number, updateContent: Content) => {
    const url = `${UPDATE_CONTENT}/${contentId}`;
    try {
        const response = await axios.put(
            url,
            {
                content: updateContent.content,
               

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating content:", error);
        throw error;
    }
};

const deleteContent = async (contentId: number) => {
    const token = Cookies.get("jwt-token");
    const url = `${DELETE_CONTENT_URI}?idContent=${contentId}`;
  
    try {
      const response = await axios.put(url, {}, {
            headers: {Authorization: `Bearer ${token}`}
        });
      return response.data;
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  };
  

const ContentService = {
    getContents,
    getContentsWithoutLessonAssociated,
    getContentById,
    createContent,
    updateContent,
    deleteContent
};

export default ContentService;