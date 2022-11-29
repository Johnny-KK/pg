import { REMOTE_NOVEL_DIR } from '../constants';
import { RemoteNovelMeta } from '../types/novel';
import { createClient } from './webdav';

const client = createClient();

function uploadNovel() {}

async function uploadMeta(meta: RemoteNovelMeta) {
  await client.putFileContentsString(`${REMOTE_NOVEL_DIR}/meta.json`, JSON.stringify(meta));
}

export { uploadNovel, uploadMeta };
