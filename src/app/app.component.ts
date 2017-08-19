import { Component, ViewChild, ElementRef } from '@angular/core';
import { Player } from './Player/Player';
import { Visualizer } from "./Player/Visualizer";
import { Notes_Zelda } from "./notes/zelda/zelda";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Player, Visualizer]
})
export class AppComponent {

  @ViewChild("pulse") pulse: ElementRef;
  @ViewChild("square") square: ElementRef;
  @ViewChild("triangle") triangle: ElementRef;
  @ViewChild("noise") noise: ElementRef;

  title = 'app';
  get playButtonText(): string {
    return this.playing ? "Stop" : "Play";
  }

  private playing: boolean = false;

  constructor(private player: Player, private visualizer: Visualizer) {
  }

  ngAfterViewInit() {
    this.visualizer.visualize(
      this.pulse.nativeElement.getContext("2d"),
      this.square.nativeElement.getContext("2d"),
      this.triangle.nativeElement.getContext("2d"),
      this.noise.nativeElement.getContext("2d")
    );
  }

  togglePlay() {
    this.playing = !this.playing;

    if (this.playing)
      this.player.play(Notes_Zelda);
    else
      this.player.stop();
  }
}
