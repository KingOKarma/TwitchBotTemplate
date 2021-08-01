# TwitchBotTemplate

This is a test mainly for practicing how webhooks work and how twitch webhooks work/ Twitch-EventSub

---

### Setup

- run in your terminal `npm install` or if you're using yarn `yarn add`

- Rename the file `example.config.yml` to `config.yml`
- Do the same with `example.token.yml` to `token.yml` and fill in the values accordingly

`config.yml`
```yml
botUsername: This is your TWITCH BOT's username (In lower case)

clientID: Your Client ID
# When getting your client ID
# Make sure the broadcaster you are getting the client ID for has authorised this link

#https://id.twitch.tv/oauth2/authorize?client_id=<CLIENTID>&redirect_uri=<OneOfTheLinksFromYourRedirectURL>&response_type=token&scope=bits:read%20channel:read:subscriptions
# <CLIENTID> = Your Client ID
# <OneOfTheLinksFromYourRedirectURL> = This is one of your links from the "OAuth Redirect URLs" on your twitch dev console

#Twitch Dev console can be found at:
#https://dev.twitch.tv/console/
clientSecret: This is your client secret you can obtain it from the offical twitch dev dashboard

prefix: Your Prefix here

twitchUsername: Put Your Twitch Username here in full lowercase letters
# If your hostname also has a path prefix you can go into main.ts and edit under "port" in "ReverseProxyAdapter":  "pathprefix" same case for the external port

```

`token.yml` can be a little harder to fill in as you will need to make at least 1 post request to twitch before hand to get your inital tokens, if you wish to have a quick setup you could use a website such as [Twitch Token Generator](https://twitchtokengenerator.com) which as simple ease of use

Then fill in:
`token.yml`
```yml
tokenData:
  accessToken: # Access token obtained from post request
  expiryTimestamp: null # can be set to null for inital setup
  refreshToken: # refresh token obtained from post request
```

### Runing the script

In your terminal just run `npm start` or `yarn start`

if you want to just use node, from the folder root run `node build/main.js` but make sure to run `tsc` before hand so the code can compile into the `build` folder

### How can I get an access_Token, Client_ID and Client Secret!!!

- First up you need to head to your twitch dev console and create yourself a new application

![](https://i.imgur.com/YADhNZ9.png)

- Make a new application (If you have already then click the one you want in the "Name" selections below).

![](https://i.imgur.com/oZYZJnN.png)

- Next up Put in your client's name

  - For the OAuth Redirect URLs you can add the website `https://twitchtokengenerator.com`, You can use your own link if you wish!.

  - Then select chat bot (If you're making something else then choose that).

  - After that you'll be redirected to the Twitch Dev console again, just simply click your Client, in you'll now see your Client ID if you scroll down, also generate the New secret so you can use that for later on in the `config.yml`

![](https://i.imgur.com/Vxoscln.png)

- Once this is done you can now go to the link:
https://twitchtokengenerator.com

- After choosing chatbot or custom token, put in your Client Secret and Client ID you choose the scopes from the list below

- Click Generate token and you'll be redirected to an Oauth page for twitch, MAKE SURE YOU ARE LOGGED IN AS THE BOT'S ACCOUNT TO ALLOW THE CORRECT AUTH TOKEN FOR THE BOT otherwise the code will be ran as your user's account


You can find a list of scopes [here](https://dev.twitch.tv/docs/authentication/#scopes)


I hope this template helps out people who just wish to make their own bots!
