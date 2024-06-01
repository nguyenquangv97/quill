// import { Pinecone } from '@pinecone-database/pinecone';

// export const getPineconeClient = async () => {
//   const client = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY!,
//   });
//   return client;
// };

import { Pinecone } from '@pinecone-database/pinecone';

const getPineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export default getPineconeClient;
