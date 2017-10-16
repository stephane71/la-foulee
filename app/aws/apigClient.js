/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://api.la-foulee.com/test';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.strideStrideIDGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['strideID'], ['body']);
        
        var strideStrideIDGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/stride/{strideID}').expand(apiGateway.core.utils.parseParametersToObject(params, ['strideID'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(strideStrideIDGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.strideStrideIDOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var strideStrideIDOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/stride/{strideID}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(strideStrideIDOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stridesMonthGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['month', 'page'], ['body']);
        
        var stridesMonthGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/strides/{month}').expand(apiGateway.core.utils.parseParametersToObject(params, ['month', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['page']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stridesMonthGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stridesMonthOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var stridesMonthOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/strides/{month}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stridesMonthOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stridesMonthDepGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['month', 'dep', 'page'], ['body']);
        
        var stridesMonthDepGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/strides/{month}/{dep}').expand(apiGateway.core.utils.parseParametersToObject(params, ['month', 'dep', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['page']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stridesMonthDepGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stridesMonthDepOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var stridesMonthDepOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/strides/{month}/{dep}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stridesMonthDepOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var userPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userUserIDGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userID'], ['body']);
        
        var userUserIDGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{userID}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userID'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userUserIDGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userUserIDPatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userID', 'body'], ['body']);
        
        var userUserIDPatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{userID}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userID', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userUserIDPatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userUserIDOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userUserIDOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{userID}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userUserIDOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
