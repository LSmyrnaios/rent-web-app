import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FileQueueObject, FileUploaderService} from '../../services/file-uploader.service';
import {Observable} from 'rxjs';
import {FileReaderService} from '../../services/file-reader.service';
import {map} from 'rxjs/operators';
import {Input} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue$: Observable<FileQueueObject[]>;

  @Input() uploadUrl: string;

  urls = [];

  constructor(
    public uploader: FileUploaderService,
    public reader: FileReaderService
  ) {
  }

  ngOnInit() {
    this.queue$ = this.uploader.queue;
    this.queue$ = this.uploader.queue.pipe(
      map((data: any) => {
        let i = 0;
        return data.map((d) => {
          this.reader.read$(d.file).subscribe((url: string) => {
            this.urls[i] = (url);
          });
          i++;
          return d;
        });
      })
    );

    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem(item: FileQueueObject, response: any) {
    console.log(item);
    console.log(response);
    this.onCompleteItem.emit({item, response});
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files, this.uploadUrl);
  }


  getUrl(item: FileQueueObject): Observable<any> {
    console.warn('item', item);
    return this.reader.read$(item.file);
  }
}
