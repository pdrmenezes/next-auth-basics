// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(request) {
  console.log(request.nextUrl.pathname);
  console.log(request.nextauth.token.role);
});

export const config = { matcher: ["/create-user"] };
