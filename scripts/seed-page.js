(() => {
  const url = new URL(document.location)
  const seed = url.searchParams.get('s')
  const patchUrl = `https://patch.synack.live/bps/${seed}`
  console.log('seed', patchUrl)
  document.body.innerHTML = `<span style="color: #fff;">Patch URL: ${patchUrl}</span>`
})()
