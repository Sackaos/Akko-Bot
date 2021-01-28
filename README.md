# Welcome to Akko Bot

# TODO List

- take the trash out.
- weekly derpy face (from pc).
- weekly blessed images form urls.
- sing songs

# Init

add a `discordKey.json` in the main folder with:

```
{
    "key":"your-discord-bot-token"
}
```

# Customization

Go to the `config.json` to change the text and response of the bot.

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
