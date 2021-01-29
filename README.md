# Welcome to Akko Bot

# TODO List

- take the trash out.
- weekly blessed images form urls.
- sing songs

# Init

Change the `data/keys-template.json` to `data/keys.json` and fill in the info:

```
{
    "botToken": "your-discord-bot-token",
    "serverID": "",
    "channelsID": {
        "logger": "",
        "main": "",
        "debug": ""
    },
    "roles": [{
        "name":"",
        "type":"superadmin|developer|admin",
        "id":""
    }
    ]
}
```

# Customization

Go to the `config.json` to change the text and response of the bot.

## Customize the bot

In `config.json` change name or prefixes (what invoke the bot):

```
"bot": {
        "name": "Akko Bot",
        "commandPrefixs": ["kk", "akko", "~"]
    }
```

## Customize the emoji message

In `config.json` change here the reponses:

```
"emoji": {
        "emojiCreate" : {
            "response" : "New emoji has been added",
            "showEmoji" : true
        },
        "emojiDelete" : {
            "response" : "Sadly, The :|emojiname|: has been deleted"
        },
        "emojiUpdate" : {
            "response" : ":|oldemojiname|: has been changed to :|newemojiname|:"
        }
    }
```

- Change `emojiCreate.showEmoji` to `false` do disable the emoji for showing up when an emoji is created.
- Add `|emojiname|` in `emojiDelete.response` to display the emoji name.
- Add `|oldemojiname|` or `|newemojiname|` in `emojiUpdate.response` to display the old/new emoji name.

## Customize the messages responses

In `config.json` change here the reponses:

```
"messages": [
        {
            "request": "this is a bucket",
            "response": {
                "text": "***DEAR GOD!***\nhttps://www.youtube.com/watch?v=L8FmQoSFys0",
                "includes": true
            }
        }
```

you can put a image link in the `text` to send a image.
when `includes` is true the bot will reply even if the `text` is within other words in a message.
