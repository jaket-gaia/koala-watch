import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClientRecord } from '../../shared/interfaces/mobile.interfaces';

@Component({
    selector: 'records-list',
    templateUrl: 'records-list.html'
})
export class RecordsListComponent {
    items: Array<{ title: string, note: string, icon: string }>;

    // mapping from DataType to an icon
    public itemIcons = [
        'assets/imgs/koala_data_poop.png',
        'assets/imgs/koala_data_eye.png'
    ];

    @Input()
    public records: ClientRecord[];
    
    @Input()
    public showLegend: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if (navParams.data !== undefined) {
            if (navParams.data.hasOwnProperty('data'))
                this.records = navParams.data.data;
            if (!navParams.data.hasOwnProperty('showLegend'))
                this.showLegend = navParams.data.showLegend;
        }
    }

    public getStatusColor(record: ClientRecord) {
        return record.valid ? '#ebffef' : '#ebf6ff';
    }

    public getIcon(record: ClientRecord): string {
        if (record.datasetName === 'Koala Opportunistic Observation') {
            return 'assets/imgs/koala_data_eye.png'
        }
    }

    public itemTapped(event, record) {
        this.navCtrl.push('ObservationPage', {
            datasetName: record.datasetName,
            recordClientId: record.clientId
        });
    }
}
