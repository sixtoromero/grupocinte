import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Component({
  selector: 'app-triqui',
  templateUrl: './triqui.component.html',
  styleUrls: ['./triqui.component.css']
})
export class TriquiComponent implements OnInit {

  urlPath: string = "../../assets/html/triqui.html";

  constructor() { }

  ngOnInit() {

  }
  

}
