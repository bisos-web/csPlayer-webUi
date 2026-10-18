#!/usr/bin/env python3
"""
PyCS Architecture Stack Diagram
Generated using Graphviz
"""

from graphviz import Digraph

def create_pycs_diagram():
    dot = Digraph(
        name='pycs_architecture',
        comment='PyCS Architecture Stack',
        format='png',
        engine='dot'
    )
    
    # Set graph attributes
    dot.attr(rankdir='TB')
    dot.attr('graph', bgcolor='white', pad='0.5', nodesep='0.5', ranksep='1.0')
    dot.attr('node', shape='box', style='filled', fillcolor='lightblue', 
             fontname='Arial', fontsize='10', margin='0.3,0.2')
    dot.attr('edge', color='gray40', fontname='Arial', fontsize='9')
    
    # Top layer: Three csPlayer implementations
    dot.node('terminal', 'Terminal User\n(compgen completion)', 
             fillcolor='lightyellow', fontsize='9')
    dot.node('blee', 'Blee csPlayer\n(Emacs-based)', 
             fillcolor='lightyellow', fontsize='9')
    dot.node('webui', 'WebUI csPlayer\n(this project)', 
             fillcolor='lightyellow', fontsize='9')
    
    # Second layer: csPlayer meta-UI
    dot.node('csplayer', 'csPlayer\n(Meta-UI for any CSXU)\n\ngithub.com/bisos-pip/csPlayer', 
             fillcolor='lightcyan', fontsize='10', fontname='Arial:bold')
    
    # Third layer: CLI execution layer
    dot.node('cli', 'CLI\n(Execution Layer)', 
             fillcolor='lightgreen', fontsize='10', fontname='Arial:bold')
    
    # Fourth layer: CSXU
    dot.node('csxu', 'CSXU (Python)\n.cs executable\n\nSelf-describing:\n- Commands\n- Parameters\n- Descriptions\n- Metadata', 
             fillcolor='lightcoral', fontsize='10', fontname='Arial:bold')
    
    # Fifth layer: Direct and Service modes
    dot.node('direct', 'Direct Mode\n(Local)', 
             fillcolor='lightyellow', fontsize='9')
    dot.node('service', 'Service Mode\n(Remote)', 
             fillcolor='lightyellow', fontsize='9')
    
    # Edges from top implementations to csPlayer
    dot.edge('terminal', 'csplayer')
    dot.edge('blee', 'csplayer')
    dot.edge('webui', 'csplayer')
    
    # csPlayer to CLI
    dot.edge('csplayer', 'cli')
    
    # CLI to CSXU
    dot.edge('cli', 'csxu')
    
    # CSXU to Direct and Service modes
    dot.edge('csxu', 'direct')
    dot.edge('csxu', 'service')
    
    return dot

if __name__ == '__main__':
    diagram = create_pycs_diagram()
    
    # Render to file
    output_file = diagram.render(filename='pycs_architecture', directory='/tmp', 
                                  cleanup=True, view=False)
    print(f"Diagram generated: {output_file}")
    print(f"PNG file: {output_file}.png")
    
    # Also print the DOT source
    print("\n--- DOT Source ---")
    print(diagram.source)
