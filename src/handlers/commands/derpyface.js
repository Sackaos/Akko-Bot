const data = require("../../data");

const derpyfaceCmdHandler = (args, messageObj) => {
  let lastDerpCall = data.loadLastDate();

  if (lastDerpCall == "") {
    lastDerpCall = new Date("1/1/1970");
  }

  const millisecondToDayMultiplayer = 1000 * 60 * 60 * 24;
  const daysPassedBetweenDerpyFace =
    Math.abs(new Date(lastDerpCall).getTime() - new Date().getTime()) /
    millisecondToDayMultiplayer;

  if (daysPassedBetweenDerpyFace > 7.0) {
    messageObj.channel.send({
      files: [
        {
          attachment: data.getRandomDerpyFace(),
          name: "weekly-derp.png",
        },
      ],
    });
    //save new date to database
    data.saveLastDate(new Date());
  } else
    messageObj.channel.send(
      `you need to wait an entire week between each derpy face requests.\n ${(
        (7.0 - daysPassedBetweenDerpyFace) *
        24
      ).toFixed(1)} hours until next time`
    );
};

module.exports = { derpyfaceCmdHandler };
