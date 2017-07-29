import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

declare let vis: any;

@Component({
	selector: 'graph-view',
	templateUrl: './graph-view.component.html',
	styleUrls: ['./graph-view.component.css'],
})
export class GraphViewComponent {
	@Input() nodes: any;
	@Input() edges: any;

	private typeList: any = [];
	private typeDict: any = {};

	private touchEvent: any;
	private selectedNode: any;
	private selectedData: any;
	private showData: any;
	private dataCount = 0;
	private visible = false;
	private isSelected = false;
	private isMore = true;
	private left = '0';
	private top = '0';

	private needClose = 0;

	container: any;
	graph: any;

	normalOptions = {
		height: '100%',
		width: '100%',

		"physics": {
			"barnesHut": {
				"avoidOverlap": 1
			},
		},

		nodes: {
			brokenImage: 'assets/images/no_theme.png',
			size: 30,
			physics: false,
			shape: "image",

			fixed: {
				x: false,
				y: false,
			},
		
			font: {
			 	color: '#343434',
				size: 14, // px
				face: 'arial',
				strokeWidth: 1, // px
				align: 'center',
				multi: 'html',
				vadjust: 0,
			},
		},

		layout: {
			randomSeed: 1000,
			improvedLayout: true,
		},

		interaction: {
			hover: true,
			hoverConnectedEdges: true,
		},

		edges: {
			smooth: {
				type: "continuous",
				forceDirection: "horizontal"
			},
			arrows: {
				to: {enabled: true, scaleFactor: 1, type: 'arrow'},
			},
			font: {
				color: 'blue',
				size: 14, // px
				face: 'arial',
				background: 'none',
				strokeWidth: 2, // px
				strokeColor: '#ffffff',
				align: 'horizontal',
				multi: false,
				vadjust: 0,
			},
		},
	};

	constructor(private http: Http) {}

	ngOnChanges(changes) {
		console.log("[graph-view] \n Change", changes);
		this.getTypes();
		this.drawGraph();
	}

	drawGraph() {
		console.log("[graph-view] \n Nodes, Edges:", this.nodes, this.edges);

		var graphNodes = [];
		for(var i = 0; i < this.nodes.length; i++) {
			var node = this.nodes[i];
			var idx = this.typeDict[node.type].index;
			if(this.typeList[idx].isSelected) {
				graphNodes.push(node);
			}
		}

		var nodes = new vis.DataSet(graphNodes);
		var edges = new vis.DataSet(this.edges);

		var data = {
			nodes: nodes,
			edges: edges
		};
		
		var options = this.normalOptions;
		this.container = document.getElementById('analysis-graph');
		this.graph = new vis.Network(this.container, data, options);
		
		var self = this;
		this.graph.on('selectNode', function(clickObject) {
			self.selectedNode = {};
			self.selectedData = [];
			self.visible = true;
			self.isSelected = true;
			self.isMore = false;

			var nodeID = clickObject.nodes[0];
			for(var i = 0; i < self.nodes.length; i++) {
				var node = self.nodes[i];
				if(node.id == nodeID) {
					self.selectedNode = node;
					var keys = Object.keys(node.data);
					for(var j = 0; j < keys.length; j++) {
						var key = keys[j];
						var obj = {
							key: key,
							value: node.data[key],
						};
						self.selectedData.push(obj);
					}
					break;
				}
			}

			self.dataCount = 0;
			self.onShowMore(5);
			self.needClose = 0;
		});
	}

	getTypes() {
		this.typeDict = {};
		for(var i = 0; i < this.nodes.length; i++) {
			var obj = this.nodes[i];
			var index = obj.type;
			if(this.typeDict[index] == undefined) {
				var type = {
					image: obj.image,
					index: 0,
					type: obj.type,
					isSelected: true,
				};
				this.typeDict[index] = type;
			}
		}

		this.typeList = [];
		var keys = Object.keys(this.typeDict);
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var obj = this.typeDict[key];
			this.typeDict[key].index = i;
			this.typeList.push(obj);
		}
	}

	refreshGraph(item) {
		this.drawGraph();
	}

	onTouch(event) {
		if(this.isSelected) {
			this.isSelected = false;
			this.left = event.x + 'px';
			this.top = event.y + 'px';
		} else {
			this.visible = false;
		}
	}

	onShowMore(more) {
		console.log("ON SHOW MORE");
		this.needClose = 1;
		this.dataCount += more;
		if(this.dataCount >= this.selectedData.length) {
			this.dataCount = this.selectedData.length;
			this.isMore = false;
		} else {
			this.isMore = true;
		}
		this.refreshData();
	}

	refreshData() {
		this.showData = [];
		for(var i = 0; i < this.dataCount; i++) {
			this.showData.push(this.selectedData[i]);
		}
	}

	onCloseTable() {
		this.visible = false;
	}
}