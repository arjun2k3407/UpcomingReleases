package com.release.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {
	
	public static String convertJavaToJson(Object object) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonResult = null;
        try {
            if (null != object) {
                jsonResult = mapper.writeValueAsString(object);
            }

        } catch (JsonGenerationException e) {
        	e.printStackTrace();
        } catch (JsonMappingException e) {
        	e.printStackTrace();
        } catch (IOException e) {
        	e.printStackTrace();
        }
        return jsonResult;
    }

    public static <T> T convertJsontoJava(String json, Class<T> cls) {
        ObjectMapper mapper = new ObjectMapper();
        T result = null;
        try {
            if (null != json && null != cls) {
                mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                result = mapper.readValue(json, cls);
            }
        } catch (JsonParseException e) {
        	e.printStackTrace();
        } catch (JsonMappingException e) {
        	e.printStackTrace();
        } catch (IOException e) {
        	e.printStackTrace();
        }
        return result;
    }
    
    public static <T> T convertJsontoJava(String json, TypeReference<T> typeRef) {
        ObjectMapper mapper = new ObjectMapper();
        T result = null;
        try {
            if (null != json && null != typeRef) {
                mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                result = mapper.readValue(json, typeRef);
            }
        } catch (JsonParseException e) {
        	e.printStackTrace();
        } catch (JsonMappingException e) {
        	e.printStackTrace();
        } catch (IOException e) {
        	e.printStackTrace();
        }
        return result;
    }
}
