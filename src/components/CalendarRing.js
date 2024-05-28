import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CalendarRing = ({ data }) => {
 const ref = useRef(null);

 useEffect(() => {
 if(data.length > 0) {
 drawCalendar();
 }
 }, [data]);

 const drawCalendar = () => {
 const svg = d3.select(ref.current);
 svg.selectAll("*").remove(); // Clear svg content before redrawing

 const width = 600;
 const height = 600;
 const radius = Math.min(width, height) / 2;

 const arc = d3.arc()
 .innerRadius(radius * 0.2)
 .outerRadius(radius * 0.8);

 const pie = d3.pie()
 .value(d => d.length) // Assuming 'data' is structured to reflect duration of each week
 .sort(null);

 svg
 .attr('width', width)
 .attr('height', height)
 .append('g')
 .attr('transform', `translate(${width / 2}, ${height / 2})`)
 .selectAll('path')
 .data(pie(data))
 .enter()
 .append('path')
 .attr('d', arc)
 .attr('fill', d => d.data.color); // Assuming 'data' includes 'color' for each week
 };

 return (
 <svg ref={ref}></svg>
 );
};

export default CalendarRing;