/**
 * Wrapper for making network requests using `fetch`
 * @type class
 * @name Request
 */

import 'whatwg-fetch';
import 'babel-polyfill';

const getToken = () => {
  return ''
};

export default class Request {
  static options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include', // include cookies with every request
  };

  /**
   * Parses the Object to query string
   * @param {object} obj JS object
   * @return {object} The parsed query string
   */
  static encodeToUrlParams(obj) {
    if (obj instanceof String) {
      return obj;
    }
    const queryString = Object.keys(obj)
      .reduce((a, k) => {
        a.push(`${k}=${encodeURIComponent(obj[k])}`);
        return a;
      }, []).join('&');
    return `${queryString}`;
  }


  /**
   * Parses the JSON returned by a network request
   * @param {object} response A response from a network request
   * @return {object} The parsed JSON from the request
   */
  static async responseJson(response) {
    try {
      return await response.json();
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  /**
   * Checks if a network request came back fine, and throws an error if not
   * @param {object} response   A response from a network request
   * @return {object|undefined} Returns either the response, or throws an error
   */
  static checkStatus(response) {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = this.responseJson(response);
    throw error;
  }

  /**
   * Send HTTP requests
   * @param {String} url  API endpoint
   * @param {Object} payload
   * @return {Promise} Returns either the response in json, or throws an error
   */
  static async request(url, options) {
    const allOptions = { ...this.options, ...options };
    const combinedOptions = {
      ...allOptions,
      headers: { ...allOptions.headers, Authorization: `Bearer ${getToken()}` },
    };
    const response = await fetch(url, combinedOptions);
    await this.checkStatus(response);
    return this.responseJson(response);
  }

  /**
   * Send HTTP GET request
   * @param {String} url  API endpoint
   * @param {Object} payload
   * @return {Promise} Returns either the response in json, or throws an error
   */
  static get(url, payload) {
    const options = { method: 'GET' };
    let endpoint = url;
    if (payload) {
      endpoint += `?${this.encodeToUrlParams(payload)}`;
    }
    return this.request(endpoint, options);
  }

  /**
   * Send HTTP POST request
   * @param {String} url  API endpoint
   * @param payload
   * @return {Promise} Returns either the response in json, or throws an error
   */
  static post(url, payload) {
    const options = { method: 'POST', body: JSON.stringify(payload) };
    return this.request(url, options);
  }

  /**
   * Send HTTP PUT request
   * @param {String} url  API endpoint
   * @param payload
   * @return {Promise} Returns either the response in json, or throws an error
   */
  static put(url, payload) {
    const options = { method: 'PUT', body: JSON.stringify(payload) };
    return this.request(url, options);
  }

  /**
   * Send HTTP DELETE request
   * @param {String} url  API endpoint
   * @param payload
   * @return {Promise} Returns either the response in json, or throws an error
   */
  static delete(url, payload) {
    const options = { method: 'DELETE', body: JSON.stringify(payload) };
    return this.request(url, options);
  }

  /**
   * Send HTTP POST request for form data
   * @param {String} url API endpoint
   * @param payload
   * @return {Promise} Returns either the response in json, or throws an error
   */
  static postWithFile(url, payload) {
    const options = {
      method: 'POST',
      body: payload,
      headers: {
        Accept: 'application/json',
      },
    };
    return this.request(url, options);
  }
}
