/* jshint latedef:false */
/* jshint forin:false */

// 
// Copyright (c) Microsoft.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

// Warning: This code was generated by a tool.
// 
// Changes to this file may cause incorrect behavior and will be lost if the
// code is regenerated.

var xml = require('xml2js');
var util = require('util');
var js2xml = require('../../util/js2xml');
var Service = require('../core/service');
var WebResource = require('../../http/webresource');

var CloudServiceManagementClient = (function() {
  /**
   * Initializes a new instance of the CloudServiceManagementClient class.
   *
   * @constructor
   *
   * @param {SubscriptionCloudCredentials} credentials - When you create a
   * Windows Azure subscription, it is uniquely identified by a subscription
   * ID. The subscription ID forms part of the URI for every call that you
   * make to the Service Management API.  The Windows Azure Service
   * ManagementAPI use mutual authentication of management certificates over
   * SSL to ensure that a request made to the service is secure.  No anonymous
   * requests are allowed.
   *
   * @param {String} baseUri - The URI used as the base for all Service
   * Management requests.
   */
  function CloudServiceManagementClient(credentials, baseUri) {
    if (credentials === null || credentials === undefined) {
      throw new Error('credentials cannot be null.');
    }
    
    CloudServiceManagementClient['super_'].call(this, credentials);
    
    this.credentials = credentials;
    this.baseUri = baseUri;
    if (this.baseUri === null || this.baseUri === undefined) {
      this.baseUri = 'https://management.core.windows.net';
    }
    this.cloudServices = new CloudServiceOperations(this);
  }
  
  util.inherits(CloudServiceManagementClient, Service);
  
  /**
   *
   * @param {EntitleResourceParameters} parameters
   *
   * @param {Function} callback
   *
   * @returns {OperationResponse} - A standard service response including an
   * HTTP status code and request ID.
   */
  CloudServiceManagementClient.prototype.entitleResource = function(parameters, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (parameters === null || parameters === undefined) {
      return callback(new Error('parameters cannot be null.'));
    }
    if (parameters.resourceNamespace === null || parameters.resourceNamespace === undefined) {
      return callback(new Error('parameters.resourceNamespace cannot be null.'));
    }
    if (parameters.resourceType === null || parameters.resourceType === undefined) {
      return callback(new Error('parameters.resourceType cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = this.baseUri + '/' + this.credentials.subscriptionId + '/EntitleResource';
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'POST';
    httpRequest.headers = {};
    httpRequest.url = url2;
    // Set Headers
    httpRequest.headers['Content-Type'] = 'application/xml';
    httpRequest.headers['x-ms-version'] = '2013-03-01';
    
    // Set Credentials
    
    // Serialize Request
    var requestContent = null;
    var requestDoc = {};
    
    var entitleResourceElement = js2xml.createElement('EntitleResource', 'http://schemas.microsoft.com/windowsazure');
    js2xml.addChildElement(requestDoc, entitleResourceElement);
    
    var resourceProviderNameSpaceElement = js2xml.createElement('ResourceProviderNameSpace', 'http://schemas.microsoft.com/windowsazure');
    js2xml.setElementValue(resourceProviderNameSpaceElement, parameters.resourceNamespace);
    js2xml.addChildElement(entitleResourceElement, resourceProviderNameSpaceElement);
    
    var typeElement = js2xml.createElement('Type', 'http://schemas.microsoft.com/windowsazure');
    js2xml.setElementValue(typeElement, parameters.resourceType);
    js2xml.addChildElement(entitleResourceElement, typeElement);
    
    var registrationDateElement = js2xml.createElement('RegistrationDate', 'http://schemas.microsoft.com/windowsazure');
    js2xml.setElementValue(registrationDateElement, parameters.registrationDate.toString());
    js2xml.addChildElement(entitleResourceElement, registrationDateElement);
    
    requestContent = js2xml.serializeDocument(requestDoc);
    httpRequest.body = requestContent;
    httpRequest.headers['Content-Length'] = Buffer.byteLength(requestContent, 'UTF8');
    // Send Request
    return this.pipeline(httpRequest, function (err, response, body) {
      if (err) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 202) {
        return callback(body);
      }
      
      // Create Result
      var result = {};
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  /**
   * The Get Operation Status operation returns the status of thespecified
   * operation. After calling an asynchronous operation, you can call Get
   * Operation Status to determine whether the operation has succeeded,
   * failed, or is still in progress.  (see
   * http://msdn.microsoft.com/en-us/library/windowsazure/ee460783.aspx for
   * more information)
   *
   * @param {String} requestId - The request ID for the request you wish to
   * track. The request ID is returned in the x-ms-request-id response header
   * for every request.
   *
   * @param {Function} callback
   *
   * @returns {CloudServiceOperationStatusResponse} - The response body
   * contains the status of the specified asynchronous operation, indicating
   * whether it has succeeded, is inprogress, or has failed. Note that this
   * status is distinct from the HTTP status code returned for the Get
   * Operation Status operation itself.  If the asynchronous operation
   * succeeded, the response body includes the HTTP status code for the
   * successful request.  If the asynchronous operation failed, the response
   * body includes the HTTP status code for the failed request, and also
   * includes error information regarding the failure.
   */
  CloudServiceManagementClient.prototype.getOperationStatus = function(requestId, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (requestId === null || requestId === undefined) {
      return callback(new Error('requestId cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = this.baseUri + '/' + this.credentials.subscriptionId + '/operations/' + requestId;
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = url2;
    // Set Headers
    httpRequest.headers['x-ms-version'] = '2013-03-01';
    
    // Set Credentials
    
    // Send Request
    return this.pipeline(httpRequest, function (err, response, body) {
      if (err) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 200) {
        return callback(body);
      }
      
      // Create Result
      var result = {};
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      // Deserialize Response
      var responseContent = body;
      var options = {};
      options.trim = true;
      options.strict = false;
      return xml.parseString(responseContent, options, function (err2, responseDoc) {
        if (err2) {
          return callback(err2);
        }
        
        var operationElement = js2xml.getElement(responseDoc, responseDoc, 'OPERATION', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
        if (operationElement) {
          var idElement = js2xml.getElement(responseDoc, operationElement, 'ID', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
          if (idElement) {
            var idInstance = idElement;
            result.id = idInstance;
          }
          
          var statusElement = js2xml.getElement(responseDoc, operationElement, 'STATUS', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
          if (statusElement) {
            var statusInstance = statusElement;
            result.status = statusInstance;
          }
          
          var httpStatusCodeElement = js2xml.getElement(responseDoc, operationElement, 'HTTPSTATUSCODE', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
          if (httpStatusCodeElement) {
            var httpStatusCodeInstance = httpStatusCodeElement;
            result.httpStatusCode = httpStatusCodeInstance;
          }
          
          var errorElement = js2xml.getElement(responseDoc, operationElement, 'ERROR', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
          if (errorElement) {
            var errorInstance = {};
            result.error = errorInstance;
            
            var codeElement = js2xml.getElement(responseDoc, errorElement, 'CODE', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
            if (codeElement) {
              var codeInstance = codeElement;
              errorInstance.code = codeInstance;
            }
            
            var messageElement = js2xml.getElement(responseDoc, errorElement, 'MESSAGE', 'HTTP://SCHEMAS.MICROSOFT.COM/WINDOWSAZURE');
            if (messageElement) {
              var messageInstance = messageElement;
              errorInstance.message = messageInstance;
            }
          }
        }
        
        return callback(null, result);
      });
    });
  };
  
  return CloudServiceManagementClient;
})();
exports.CloudServiceManagementClient = CloudServiceManagementClient;

var CloudServiceOperations = (function() {
  /**
   * Initializes a new instance of the CloudServiceOperations class.
   *
   * @constructor
   *
   * @param {CloudServiceManagementClient} client - Reference to the service
   * client.
   */
  function CloudServiceOperations(client) {
    this.client = client;
  }
  
  /**
   *
   * @param {String} cloudServiceName
   *
   * @param {CloudServiceCreateParameters} parameters
   *
   * @param {Function} callback
   *
   * @returns {OperationResponse} - A standard service response including an
   * HTTP status code and request ID.
   */
  CloudServiceOperations.prototype.beginCreating = function(cloudServiceName, parameters, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (cloudServiceName === null || cloudServiceName === undefined) {
      return callback(new Error('cloudServiceName cannot be null.'));
    }
    if (cloudServiceName.length > 100) {
      return callback(new Error('cloudServiceName is outside the valid range.'));
    }
    if (parameters === null || parameters === undefined) {
      return callback(new Error('parameters cannot be null.'));
    }
    if (parameters.description && parameters.description.length > 1024) {
      return callback(new Error('parameters.description is outside the valid range.'));
    }
    if (parameters.email === null || parameters.email === undefined) {
      return callback(new Error('parameters.email cannot be null.'));
    }
    if (parameters.geoRegion === null || parameters.geoRegion === undefined) {
      return callback(new Error('parameters.geoRegion cannot be null.'));
    }
    if (parameters.label && parameters.label.length > 100) {
      return callback(new Error('parameters.label is outside the valid range.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = this.client.baseUri + '/' + this.client.credentials.subscriptionId + '/CloudServices/' + cloudServiceName;
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'PUT';
    httpRequest.headers = {};
    httpRequest.url = url2;
    // Set Headers
    httpRequest.headers['Content-Type'] = 'application/xml';
    httpRequest.headers['x-ms-version'] = '2013-03-01';
    
    // Set Credentials
    
    // Serialize Request
    var requestContent = null;
    var requestDoc = {};
    
    var cloudServiceElement = js2xml.createElement('CloudService', 'http://schemas.microsoft.com/windowsazure');
    js2xml.addChildElement(requestDoc, cloudServiceElement);
    
    if (parameters.label) {
      var labelElement = js2xml.createElement('Label', 'http://schemas.microsoft.com/windowsazure');
      js2xml.setElementValue(labelElement, new Buffer(parameters.label).toString('base64'));
      js2xml.addChildElement(cloudServiceElement, labelElement);
    }
    
    if (parameters.description) {
      var descriptionElement = js2xml.createElement('Description', 'http://schemas.microsoft.com/windowsazure');
      js2xml.setElementValue(descriptionElement, parameters.description);
      js2xml.addChildElement(cloudServiceElement, descriptionElement);
    }
    
    var geoRegionElement = js2xml.createElement('GeoRegion', 'http://schemas.microsoft.com/windowsazure');
    js2xml.setElementValue(geoRegionElement, parameters.geoRegion);
    js2xml.addChildElement(cloudServiceElement, geoRegionElement);
    
    var emailElement = js2xml.createElement('Email', 'http://schemas.microsoft.com/windowsazure');
    js2xml.setElementValue(emailElement, parameters.email);
    js2xml.addChildElement(cloudServiceElement, emailElement);
    
    requestContent = js2xml.serializeDocument(requestDoc);
    httpRequest.body = requestContent;
    httpRequest.headers['Content-Length'] = Buffer.byteLength(requestContent, 'UTF8');
    // Send Request
    return this.client.pipeline(httpRequest, function (err, response, body) {
      if (err) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 202) {
        return callback(body);
      }
      
      // Create Result
      var result = {};
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  /**
   *
   * @param {String} cloudServiceName
   *
   * @param {Function} callback
   *
   * @returns {OperationResponse} - A standard service response including an
   * HTTP status code and request ID.
   */
  CloudServiceOperations.prototype.beginDeleting = function(cloudServiceName, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (cloudServiceName === null || cloudServiceName === undefined) {
      return callback(new Error('cloudServiceName cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = this.client.baseUri + '/' + this.client.credentials.subscriptionId + '/CloudServices/' + cloudServiceName;
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'DELETE';
    httpRequest.headers = {};
    httpRequest.url = url2;
    // Set Headers
    httpRequest.headers['x-ms-version'] = '2013-03-01';
    
    // Set Credentials
    
    // Send Request
    return this.client.pipeline(httpRequest, function (err, response, body) {
      if (err) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 202) {
        return callback(body);
      }
      
      // Create Result
      var result = {};
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  /**
   *
   * @param {String} cloudServiceName
   *
   * @param {CloudServiceCreateParameters} parameters
   *
   * @param {Function} callback
   *
   * @returns {CloudServiceOperationStatusResponse} - The response body
   * contains the status of the specified asynchronous operation, indicating
   * whether it has succeeded, is inprogress, or has failed. Note that this
   * status is distinct from the HTTP status code returned for the Get
   * Operation Status operation itself.  If the asynchronous operation
   * succeeded, the response body includes the HTTP status code for the
   * successful request.  If the asynchronous operation failed, the response
   * body includes the HTTP status code for the failed request, and also
   * includes error information regarding the failure.
   */
  CloudServiceOperations.prototype.create = function(cloudServiceName, parameters, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    var client2 = this.client;
    
    return client2.cloudServices.beginCreating(cloudServiceName, parameters, function (err, result) {
      if (err) {
        return callback(err);
      }
      var delayInSeconds = 30;
      
      var pollOperation = function () {
        setTimeout(function () {
          return client2.getOperationStatus(result.requestId, function (err2, result2) {
            if (err2) {
              return callback(err2);
            } else {
              if (result2.status !== 'InProgress') {
                return callback(null, result2);
              } else {
                delayInSeconds = 10;
                pollOperation();
              }
            }
          });
        }, delayInSeconds * 1000);
      };
      
      pollOperation();
    });
  };
  
  /**
   *
   * @param {String} cloudServiceName
   *
   * @param {Function} callback
   *
   * @returns {CloudServiceOperationStatusResponse} - The response body
   * contains the status of the specified asynchronous operation, indicating
   * whether it has succeeded, is inprogress, or has failed. Note that this
   * status is distinct from the HTTP status code returned for the Get
   * Operation Status operation itself.  If the asynchronous operation
   * succeeded, the response body includes the HTTP status code for the
   * successful request.  If the asynchronous operation failed, the response
   * body includes the HTTP status code for the failed request, and also
   * includes error information regarding the failure.
   */
  CloudServiceOperations.prototype.delete = function(cloudServiceName, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    var client2 = this.client;
    
    return client2.cloudServices.beginDeleting(cloudServiceName, function (err, result) {
      if (err) {
        return callback(err);
      }
      var delayInSeconds = 30;
      
      var pollOperation = function () {
        setTimeout(function () {
          return client2.getOperationStatus(result.requestId, function (err2, result2) {
            if (err2) {
              return callback(err2);
            } else {
              if (result2.status !== 'InProgress') {
                return callback(null, result2);
              } else {
                delayInSeconds = 10;
                pollOperation();
              }
            }
          });
        }, delayInSeconds * 1000);
      };
      
      pollOperation();
    });
  };
  
  return CloudServiceOperations;
})();