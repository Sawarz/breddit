import community from './Community';
import post from './Post';
import comment from './Comment';
import like from './Like';
import misc from './Misc'
import user from './User'
import friends from './Friends';


const Firebase = {
  post: post,
  like: like,
  community: community,
  comment: comment,
  user: user,
  friends: friends,
  getImage: misc.getImage,
}

export default Firebase;