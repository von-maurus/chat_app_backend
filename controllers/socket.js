const Message = require("../models/messages");
const User = require("../models/user");

async function changeOnlineUser(uid = "", isOnline = false) {
  try {
    const user = await User.findById(uid);
    if (user) {
      user.online = isOnline;
      await user.save();
    }
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const connectUser = (uid) => changeOnlineUser(uid, true);
const disconnectUser = (uid) => changeOnlineUser(uid, false);
const saveMessage = async (payload) => {
  try {
    const { from, to } = payload;
    if (!from || !to) {
      return false;
    }
    const msg = new Message(payload);
    await msg.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
module.exports = {
  connectUser,
  disconnectUser,
  saveMessage
};
