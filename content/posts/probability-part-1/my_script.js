var adapter = null;
var device = null;

async function DoTriangleDemo()
{
  const canvas = document.getElementById("triangleCanvas");

  canvas.style.background = "green";

  const context = canvas.getContext('webgpu');
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format: presentationFormat, // ie rgba8unorm
  });

const shaderUrl = new URL("triangle.wgsl", import.meta.url);
const shaderResponse = await fetch(shaderUrl);
if (!shaderResponse.ok)
  throw new Error(`Could not load shader: ${shaderResponse.status} ${shaderResponse.statusText}`);
const shaderCode = await shaderResponse.text();

const module = device.createShaderModule({
  label: 'my triangle shader',
  code: shaderCode,
});

const info = await module.getCompilationInfo();
for (const message of info.messages)
  console[message.type === "error" ? "error" : "warn"](
    `[${message.type}] ${message.lineNum}:${message.linePos} ${message.message}`,
  );


  const pipeline = device.createRenderPipeline({
    label: 'my triangle pipeline',
    layout: 'auto',
    vertex: {
      module,
    },
    fragment: {
      module,
      targets: [{ format: presentationFormat }],
    },
  });

  const renderPassDescriptor = {
    label: 'our basic canvas renderPass',
    colorAttachments: [
      {
        // view: <- to be filled out when we render
        clearValue: [0.3, 0.3, 0.3, 1],
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  };  

 function render() {
    // Get the current texture from the canvas context and
    // set it as the texture to render to.
    renderPassDescriptor.colorAttachments[0].view =
        context.getCurrentTexture().createView();
 
    // make a command encoder to start encoding commands
    const encoder = device.createCommandEncoder({ label: 'my_encoder' });
 
    // make a render pass encoder to encode render specific commands
    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(pipeline);
    pass.draw(3);  // call our vertex shader 3 times
    pass.end();
 
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
  }
 
  render();

}

function DoCubeDemo()
{
  const canvas = document.getElementById("cubeCanvas");

  canvas.style.background = "rebeccapurple";
}


async function main() {
  adapter = await navigator.gpu?.requestAdapter();
  device = await adapter?.requestDevice();
  if (!device) {
    fail('need a browser that supports WebGPU');
    return;
  }

  DoTriangleDemo();
  DoCubeDemo();
}
main();


console.log("ver 3")


