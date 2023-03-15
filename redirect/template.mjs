export default function redirectTemaplte(redirect) {
  return (`
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting to ${redirect}</title>
    <meta http-equiv="refresh" content="0; URL=${redirect}">
    <link rel="canonical" href="${redirect}">
  </head>
  <body style="background-color: #000; color: #fff;">
    Redirecting to ${redirect}
  </body>
</html>
  `)
}
