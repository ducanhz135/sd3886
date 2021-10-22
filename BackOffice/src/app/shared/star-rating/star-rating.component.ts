import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styles: [
    ".rating-list li {float: right; color: #ddd;padding: 10px 5px; }",
    ".rating-list li:hover, .rating-list li:hover ~ li, .rating-list li.selected { color: #ffd700;}",
    ".rating-list { display: inline-block;list-style: none;}"
  ]
})
export class StarRatingComponent implements OnInit {


  stars: number[] = [1, 2, 3, 4, 5];
  @Input() selectedValue: number;
    hoverStar: number;
    @Input()  readOnly: boolean;
  
   @Output() onStarPicked = new EventEmitter();

  constructor() {
    
   }

  ngOnInit(): void {
  }

  hoveringOver(event, star): void {
    if(this.readOnly == false){
      
      
      this.hoverStar = star;
    }
    
  }
 
  resetStar(): void {
    if(!this.readOnly)
     this.hoverStar = void 0;

  }

  countStar(star) {
    if(!this.readOnly){
      this.selectedValue = star;
      this.onStarPicked.emit(star);
    }
    
    
  }
}
