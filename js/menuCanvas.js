var $rootElement = $("#Menu > li"),
	hierarchy = setupLines($rootElement);

function setupLines($element, parent) {
	
	var current = { element : $element };
	
	if(parent) {
		var parentRect = parent.element[0].getBoudningClientRect(),
			elementRect = $element[0].getBoundingClientRect(),
			line = new Path();
		
		line.strokeColor = 'white';
		line.add(new Point(parentRect.left, parentRect.top), new Point(elementRect.left, elementRect.top));

		current.line = line;
		
		if(!parent.children) {
			parent.children = [];
		}
		
		parent.children.push(current);
	}
	
	console.log($("#Menu > li .menu > li"));
	
	var $descendants = $(".menu > li", $element);
	console.log("IT HAS ", $descendants);
	$descendants.each(function($descendant) {
		setupLines($descendant, current);
	});
	
	return current;
}

console.log(hierarchy);

function onFrame(event) {
	
}

/*var menuCanvas = $("#MenuCanvas")[0];
	paper.setup(menuCanvas);
	paper.keepalive = true;
	
	var line = new paper.Path();
	line.strokeColor = 'black';
	var start = new paper.Point(100, 100);
	line.moveTo(start);
	line.lineTo(start.add([ 200, -50 ]));
	paper.view.draw();
	
	paper.view.onFrame = function() {
		
		var bounds = $("#TestMe")[0].getBoundingClientRect();
		
		var start = line.segments[0],
			end = line.segments[1];
		
		start.point.x = 0;
		start.point.y = 0;
		
		end.point.x = bounds.left;
		end.point.y = bounds.top;
	}
	
	function draw() {
		requestAnimationFrame(draw);
		var bounds = $("#TestMe")[0].getBoundingClientRect();
		$("#BoundingBox").offset(bounds);
		$("#BoundingBox").height(bounds.height);
		$("#BoundingBox").width(bounds.width);
		
		//console.log(($("#TestMe")[0]).getBoundingClientRect());
	}
	
	//draw();*/