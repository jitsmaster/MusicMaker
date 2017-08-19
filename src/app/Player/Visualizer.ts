import { Injectable } from "@angular/core";
import { Player } from "./Player";

var canvasWidth = 800, canvasHeight = 60;

@Injectable()
export class Visualizer {
	pulseAnalyser;
	squareAnalyser;
	triangleAnalyser;
	noiseAnalyser;

	constructor(private player: Player) {
		this.pulseAnalyser = player.pulseAnalyser;
		this.squareAnalyser = player.squareAnalyser;
		this.triangleAnalyser = player.triangleAnalyser;
		this.noiseAnalyser = player.noiseAnalyser;
	}

	drawWave(context, values, gradient) {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.beginPath();

		context.lineJoin = "round";
		context.lineWidth = 1;
		context.strokeStyle = gradient;

		context.moveTo(0, (values[0] / 255) * canvasHeight);
		for (var i = 1, len = values.length; i < len; i++) {
			var val = values[i] / 255;
			var x = canvasWidth * (i / len);
			var y = val * canvasHeight;
			context.lineTo(x, y);
		}
		context.stroke();
	}

	visualize(pulseContext, squareContext, triangleContext, noiseContext) {
		var pulseGradient = pulseContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
		pulseGradient.addColorStop(0, '#322982');
		pulseGradient.addColorStop(1, '#B742CB');

		var squareGradient = squareContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
		squareGradient.addColorStop(0, '#785FCA');
		squareGradient.addColorStop(1, '#018AE4');

		var triangleGradient = triangleContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
		triangleGradient.addColorStop(0, '#00AE3A');
		triangleGradient.addColorStop(1, '#00D5AC');

		var noiseGradient = noiseContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
		noiseGradient.addColorStop(0, '#FF3D00');
		noiseGradient.addColorStop(1, '#E47701');

		requestAnimationFrame(() => this.visualize(pulseContext, squareContext, triangleContext, noiseContext));
		this.drawWave(pulseContext, this.pulseAnalyser.analyse(), pulseGradient);
		this.drawWave(squareContext, this.squareAnalyser.analyse(), squareGradient);
		this.drawWave(triangleContext, this.triangleAnalyser.analyse(), triangleGradient);
		this.drawWave(noiseContext, this.noiseAnalyser.analyse(), noiseGradient);
	}
}