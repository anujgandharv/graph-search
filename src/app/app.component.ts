import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { Http } from '@angular/http';

import { environment } from '../environments/environment';

import {Tabs} from './components/tabs/tabs.component';
import {Tab} from './components/tab/tab.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    /* ----------------- Variables ----------------- */
    title = 'App Title!';

    nodes: any = [];
    edges: any = [];
    isLoaded = false;


    /* ----------------- Functions ----------------- */
    constructor(public http: Http) {}

    ngOnInit() {
        // this.retrieveData();
    }

	retrieveData(text) {
        if(text == "" || text == undefined) {
            return;
        }

		var url = environment.apiURL + "/context?query=" + text;

		// Get nodes and edges..
		this.http.get(url).subscribe(
			response => {
				var result = response.json();
                console.log("[AppComponent] \n Nodes and Edges Result:", result);
                this.parseData(result);
                this.isLoaded = true;
			},
			err => {
                console.log("[AppComponent] \n Error on get data:", err);
            }
		);
    }

    parseData(data) {
        this.edges = [];
        this.nodes = [];
        var ids = {};
        
        if(data['edges'] == undefined) {
            console.log("[AppComponent] \n Parse Data Error : No edges!");
        }

        for(var i = 0; i < data.edges.length; i++) {
            var obj = data.edges[i];
            var isExist = ids[obj.id];
            if(!isExist) {
                var edge = {
                    id: obj.id,
                    label: obj.internalType,
                    internalType: obj.internalType,
                    from: obj.source,
                    to: obj.target,
                    data: obj.data,
                };
                this.edges.push(edge);
            }
            ids[obj.id] = true;
        }

        if(data['nodes'] == undefined) {
            console.log("[AppComponent] \n Parse Data Error : No nodes!");
        }

        ids = {};
        
        for(var i = 0; i < data.nodes.length; i++) {
            var obj = data.nodes[i];
            var isExist = ids[obj.id];
            if(!isExist) {
                var node = {
                    id: obj.id,
                    label: obj.label,
                    type: obj.type,
                    image: 'assets/images/' + obj.type + ".jpg",
                    data: obj.data,
                };
            }
            ids[obj.id] = true;
            this.nodes.push(node);
        }
    }

    search(result) {
        console.log("RESULT", result);
        this.retrieveData(result.text);
    }
}
