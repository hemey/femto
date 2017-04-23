$(function() {
	
	// Full page configuration
	
	$('#Sections').fullpage({
		menu: '#Menu'
	});
	
	// Menu canvas configuration
	
	var menuCanvas = $("#MenuCanvas")[0],
		$rootElement = $("#Menu > li"),
		offset = $rootElement.height() / 2,
		hierarchy;
		
	paper.setup(menuCanvas);
	paper.view.onFrame = function(event) {
		drawHierarchy(hierarchy);
	}
	
	hierarchy = setupHierarchy($rootElement);
	
	function setupHierarchy($element, parent) {
		
		var current = { element : $element };
		
		if(parent) {
			var parentRect = parent.element[0].getBoundingClientRect(),
				elementRect = $element[0].getBoundingClientRect();
			
			var line = new paper.Path();
			
			line.strokeColor = 'black';
			line.add(new paper.Point(parentRect.left, parentRect.top), new paper.Point(elementRect.left, elementRect.top));
	
			current.line = line;
			
			if(!parent.children) {
				parent.children = [];
			}
			
			parent.children.push(current);
		}
		
		var $descendants = $(".menu > li", $element);
		$descendants.each(function() {
			setupHierarchy($(this), current);
		});
		
		return current;
	}
	
	function drawHierarchy(current) {
		var currentRect = current.element[0].getBoundingClientRect();
		
		$.each(current.children, function(i, child) {
			var childRect = child.element[0].getBoundingClientRect(),
				start = child.line.segments[0],
				end = child.line.segments[1];
			
			start.point.x = currentRect.left + offset;
			start.point.y = currentRect.top + offset;
			end.point.x = childRect.left + offset;
			end.point.y = childRect.top + offset;
		});
	}

	/*var line = new paper.Path();
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
	}*/
	
	//draw();
});