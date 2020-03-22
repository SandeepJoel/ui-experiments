export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

export function getRandomHexColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function drawPolygon(ctx, x, y, radius, sides, rotateAngle, color, opacity, styleType) {
  if (sides < 3) return;
  var a = ((Math.PI * 2)/sides);
  ctx.save();
  ctx.beginPath();
  ctx.translate(x,y);
  ctx.rotate(rotateAngle);
  ctx.moveTo(radius,0);
  for (let i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.shadowBlur = 2;
  ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  if (styleType === 'stroke') {
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    ctx.stroke();
  } else if (styleType === 'fill') {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    ctx.fill();
  }
  ctx.restore();
}

export function drawCircle(ctx, x, y, r, color, opacity, styleType) {
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
  if (styleType === 'stroke') {
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    ctx.stroke();
  } else if (styleType === 'fill') {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    ctx.fill();
  }
}