import axios from 'axios';
import Service, {updateToken} from './Service';

interface Attachment {
  attachment_id: number;
  user_id: number;
  event_id: number;
  data: File;
  filename: string;
  filetype: string;
  filesize: number;
}

class AttachmentService extends Service {
  // Fetches all attachments for an event by its id
  getAttachmentsForEvent(eventId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/event/' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
   
  

  // Fetches all attachments for a user by its id
  getAttachmentsForUser(userId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/user/' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }


  // Fetches all attachments for a user associated with an event
  getAttachmentsForUserForEvent(userId: number, eventId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/user/' + userId + '&' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
  

  // Adds an attachment
  addAttachment(attachment: Attachment) {
    console.log(attachment);
    const data = new FormData();
    data.append('file', attachment.data);
    data.append('data', JSON.stringify(attachment));
    console.log(data);
    updateToken();
    return axios({
      method: 'post',
      url: this.path + '/authorized/attachments/',
      data: data,
      headers: {
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
  

  // Updates an attachment
  updateAttachment(attachment: Attachment) {
    updateToken();
    return axios({
      method: 'put',
      url: this.path + '/authorized/attachments/' + attachment.attachment_id,
      data: attachment,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Deletes an attachment
  deleteAttachment(attachmentId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/attachments/' + attachmentId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Add user to attachment in attachment_user table in DB
  addUserForAttachment(attachmentId: number, userId: number) {
    updateToken();
    return axios({
      method: 'post',
      url: this.path + '/authorized/attachments/attachment_user/' + attachmentId + '&' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Delete user to attachment in attachment_user table in DB
  deleteAttachmentforUser(attachmentId: number, userId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/attachments/attachment_user/' + attachmentId + '&' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

}

export let attachmentService = new AttachmentService();
