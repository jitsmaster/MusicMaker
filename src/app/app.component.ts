import { Component, ViewChild, ElementRef } from '@angular/core';
import { Player } from './Player/Player';
import { Visualizer } from "./Player/Visualizer";
import { Notes_Zelda } from "./notes/zelda/zelda";
import { Notes_Mario } from "./notes/mario/mario";
import { Notes_FF } from "./notes/ff/ff";
import { Notes_Contra } from "./notes/contra/contra";
import { Notes_Contra2 } from "./notes/contra2/contra2"
import { Notes_LifeForce } from "./notes/lifeforce/lifeForce";
import { Notes_DoubleDragon } from "./notes/dougledragon/dd";
import { Notes_Castlevania } from "./notes/castlevania/castlevania";

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

    songName: string;

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

        var song = null;
        if (this.songName == "Zelda")
            song = Notes_Zelda;
        else if (this.songName == "Mario")
            song = Notes_Mario;
        else if (this.songName == "FF")
            song = Notes_FF;
        else if (this.songName == "Contra")
            song = Notes_Contra;
            else if (this.songName == "Contra2")
            song = Notes_Contra2;
        else if (this.songName == "Salamander")     
            song = Notes_LifeForce;
        else if (this.songName == "dd")     
            song = Notes_DoubleDragon;
        else if (this.songName == "castlavania")
            song = Notes_Castlevania;
        
        if (this.playing)
            this.player.play(song);
        else
            this.player.stop();
    }
}
