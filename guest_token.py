import requests
 
## sdk id: f167fcca-0312-484c-8364-2a7a377c75d3 

#####
# 1. first we need to get a token for an account, which has privileges to create guest tokens
#####
api_url = "http://localhost:8088/api/v1/security/login"
payload = {"password":"", 
            "provider":"db",
            "refresh":True,
            "username":""
 }
response = requests.post(api_url, json=payload)
 
 # the acc_token is a json, which holds access_token and refresh_token
access_token = response.json()['access_token']
 
 #####
# 2. Now create a guest token (Service Account) with predefined privileges and filter criteria
#####
api_url_for_guesttoken = "http://localhost:8088/api/v1/security/guest_token"
payload = {
     "user": {
         "username": "guest",
         "first_name": "Guest",
         "last_name": "User"
     },
     "resources": [{
         "type": "dashboard",
         "id": "7"
     }],
     "rls": [        
]
}
 
 # the crucial part: add the specific auth-header for the python call
response = requests.post(api_url_for_guesttoken , json=payload, headers={'Authorization':f"Bearer {access_token}"})
print(response.json())
