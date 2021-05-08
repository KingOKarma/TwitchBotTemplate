# TwitchBotTemplate

This is a test mainly for practicing how webhooks work and how twitch webhooks work/ Twitch-EventSub

---

### Setup

- run in your terminal `npm install` or if you're using yarn `yarn`

- Rename the file `example.config.yml` to `config.yml`

- Write your parameters into the file, notes are written in the file:

```yml
accessToken: Your access Token
# This will be shown when using the link below in the url address, make sure this access token was allowed

botAccessToken: This is the access Token used for the bot account
# using your chatbot of choice's token (This is to allows the bot to view and type in chat)

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

environment: This should be either "dev" or "production" depending on which environment you are currnetly on

prefix: Your Prefix here

twitchUsername: Put Your Twitch Username here in full lowercase letters
# If your hostname also has a path prefix you can go into main.ts and edit under "port" in "ReverseProxyAdapter":  "pathprefix" same case for the external port
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

  - For the OAuth Redirect URLs you can add the website `https://redirect.bucketbot.dev` As i have setup a redirect link to make it easier for users but you can use your own link if you wish!.

  - Then select chat bot (If you're making something else then choose that).

  - After that you'll be redirected to the Twitch Dev console again, just simply click your Client, in you'll now see your Client ID if you scroll down, also generate the New secret so you can use that for later on in the `config.yml`

![](https://i.imgur.com/Vxoscln.png)

- Once this is done you can now go to the link:

https://id.twitch.tv/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&redirect_uri=https://redirect.bucketbot.dev&response_type=token&scope=bits:read%20channel:read:subscriptions%20chat:read%20chat:edit

- If you have your own link the replace `https://redirect.bucketbot.dev` in there too!

- with replacing the `CLIENT_ID_GOES_HERE` with your client ID
  It's also worth noting that you can change the permission scopes by adding the scopes to the end of the link, in this link its:

  - `bits:read` // This is for reading bit events (if you choose to)

  - `channel:read:subscriptions` // This is for reading sub events and reading how many subs you have

  - `chat:read` // This is for reading your twitch chat
  - `chat:edit` // This is for typing in your twitch chat

  ##### REMEMBER

  You must do this same proccess with getting your chatbot's access token (You can use the same Client ID but you need both access tokens, If the redirect auto logs you in try using incogneto mode or something.)

You can split these up either with a space for with `&20`

You can find a list of scopes [here](https://dev.twitch.tv/docs/authentication/#scopes)

**IF you have chosen to use my link then:**

After authorising you'll be redirected to https://redirect.bucketbot.dev
With your access token being at the top of the page:

![](https://i.imgur.com/KwvtKvc.png)

If you go to this website normally without authorising the website will look like this:

![](https://i.imgur.com/AKlFE55.png)

**IF you did not use my link:**

You can go to your link above and you'll see after authorising you'll be redirected to your own linked website, you'll notice at the top in the link search bar the `#access_token=<token>` thats where you'll find your token!

I hope this template helps out people who just wish to make their own bots!
