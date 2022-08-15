import community from './Community';
import post from './Post';
import comment from './Comment';
import like from './Like';
import misc from './Misc'


const Firebase = {
  post: post,
  like: like,
  community: community,
  comment: comment,
  getImage: misc.getImage,
  getUser: misc.getUser,
}

export default Firebase;