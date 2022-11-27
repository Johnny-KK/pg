import { db } from '../../db';

// function
function dbListMusic() {
  db.music.toArray();
}

export { dbListMusic };
