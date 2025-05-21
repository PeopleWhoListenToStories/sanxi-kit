// import jsonwebtoken from 'jsonwebtoken'

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1YzgyNmYyLTFkY2QtNDBiNy04YjhhLWIzNmI0YThkZmRlOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZm94bWFpbC5jb20iLCJyb2xlIjoidmlzaXRvciIsImlhdCI6MTc0MjAzNzE3MywiZXhwIjoxNzQyMTIzNTczfQ.mlaQ8SAyNY_Jb9AwtrDTf7FHk4l2NBUgfI2yDdFB3R0'

export async function POST(): Promise<Response> {
  if (!JWT_SECRET) {
    return new Response(
      JSON.stringify({ error: 'No collaboration token provided, please set TIPTAP_COLLAB_SECRET in your environment' }),
      { status: 403 },
    )
  }
  // const jwt = await jsonwebtoken.sign(
  //   {
  //     /* object to be encoded in the JWT */
  //   },
  //   JWT_SECRET,
  // )

  return new Response(JSON.stringify({ token: JWT_SECRET }))
}