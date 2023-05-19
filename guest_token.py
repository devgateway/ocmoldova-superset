import requests
 
#####
# 1. first we need to get a token for an account, which has privileges to create guest tokens
#####
api_url = "http://localhost:8088/api/v1/security/login"
payload = {"password":"[password]", 
            "provider":"db",
            "refresh":True,
            "username":"[user]"
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
         "username": "stan_lee",
         "first_name": "Stan",
         "last_name": "Lee"
     },
     "resources": [{
         "type": "dashboard",
         "id": "13"
     }],
     "rls": [
         { "clause": "publisher = 'Nintendo'" }
     ]
}
 
 # the crucial part: add the specific auth-header for the python call
response = requests.post(api_url_for_guesttoken , json=payload, headers={'Authorization':f"Bearer {access_token}"})
print(response.json())
