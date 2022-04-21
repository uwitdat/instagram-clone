export function requireAuthentication(gssp) {
  return async (context) => {
    const { req, res } = context;
    const token = req.cookies.JWT;

    if (token === undefined) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  }
}