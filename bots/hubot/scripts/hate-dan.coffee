module.exports = (robot) ->
  robot.hear /dan/i, (res) ->
    res.send "Fuck that guy!"
    return
