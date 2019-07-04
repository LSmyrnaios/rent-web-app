import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeContext, LabelType, Options } from 'ng5-slider';
import { AmenitiesCount } from '../../../../../shared/models/AmenitiesCount';
import { Filters } from '../../../../../shared/models/Filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() filters: Filters;
  @Input() sliderOptions: Options;
  @Input() amenitiesCount: AmenitiesCount;

  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  progress: boolean;

  constructor(
    private router: Router,
  ) {
  }

  filter(key) {
    console.log(key, this.filters[key]);
    this.router.navigate(['/search'],
      {
        queryParams: {
          [key]: this.filters[key],
          minPrice: this.filters.minPrice,
          maxPrice: this.filters.maxPrice
        },
        queryParamsHandling: 'merge'
      });
  }

  ngOnInit() {
    this.sliderOptions = {
      floor: this.filters.floorPrice,
      ceil: this.filters.ceilPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Min price:</b> $' + value;
          case LabelType.High:
            return '<b>Max price:</b> $' + value;
          default:
            return '$' + value;
        }
      }
    };
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    console.log('onUserChangeEnd', changeContext);
    if (!changeContext.pointerType) {
      this.filters.minPrice = changeContext.value;
      this.filter('minPrice');
    } else {
      this.filters.maxPrice = changeContext.highValue;
      this.filter('maxPrice');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.filters);
    this.filters = changes.filters.currentValue;
    this.amenitiesCount = changes.amenitiesCount.currentValue;
    this.sliderOptions = {
      floor: this.filters.floorPrice,
      ceil: this.filters.ceilPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Min price:</b> $' + value;
          case LabelType.High:
            return '<b>Max price:</b> $' + value;
          default:
            return '$' + value;
        }
      }
    };
    this.manualRefresh.emit();
  }
}
