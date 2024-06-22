addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  const { host, pathname } = new URL(request.url)

  // 替换成你实际使用的域名
  const expectedHost = "pypi.20010101.xyz"; 
  if (host !== expectedHost) {
    return new Response("您需要修改Workers中的域名才能正常使用！", { status: 400 });
  }

  if (pathname.startsWith("/simple")) {
    const resp = await fetch(`https://pypi.org${pathname}`)
    const text = await resp.text()
    const replace_re = /:\/\/files.pythonhosted.org\//g
    const replace_target = `://${host}/`
    return new Response(
      text.replace(replace_re, replace_target),
      {
        headers: resp.headers,
      }
    )
  }

  if (pathname.startsWith("/packages")) {
    let response = await fetch(`https://files.pythonhosted.org${pathname}`)
    let { readable, writable } = new TransformStream()
    response.body.pipeTo(writable)
    return new Response(readable, response)
  }

  return new Response(
    `This is a <a href="https://pypi.org/simple/">PyPi</a> mirror that created by <a href="https://github.com/snakexgc/Cloudflare-Workers-Pypi-Mirror">Cloudflare-Workers-Pypi-Mirror</a>.`,
    {
      headers: { "Content-Type": "text/html" },
      status: 404,
    }
  )
}
