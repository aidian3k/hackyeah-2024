import { ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import { useState, useMemo, Fragment } from "react";

type TreeNode = {
    [key: string]: TreeNode
  }

const mockNotes = [{
    title: "siema 1",
    categories: ["polibuda", "elektryczny", "informatyka", "algorytmy"]
},{
    title: "siema 2",
    categories: ["polibuda", "elektryczny", "informatyka", "bla bla"]
},
{
    title: "siema 1",
    categories: ["polibuda", "elektryczny", "elektotechnika", "siema"]
}]

const Tree = ({}) => {
    const categoryTree = useMemo(() => {
        const tree: TreeNode = {}
    
        mockNotes.forEach(note => {
          let currentLevel = tree
          note.categories.forEach(category => {
            if (!currentLevel[category]) {
              currentLevel[category] = {}
            }
            currentLevel = currentLevel[category]
          })
        })
    
        return tree
      }, [])
    
      const TreeNode: React.FC<{ node: TreeNode; path: string[]; level: number }> = ({ node, path, level }) => {
        const [isExpanded, setIsExpanded] = useState(level < 2)
        const hasChildren = Object.keys(node).length > 0
        const singleChild = hasChildren && Object.keys(node).length === 1
    
        const toggleExpand = () => {
          setIsExpanded(!isExpanded)
        }
    
        if (singleChild) {
          const childName = Object.keys(node)[0]
          return (
            <TreeNode
              node={node[childName]}
              path={[...path, childName]}
              level={level + 1}
            />
          )
        }
    
        return (
          <div className="ml-4">
            <div className="flex items-center py-1">
              <Breadcrumb>
                <BreadcrumbList>
                  {path.map((item, index) => (
                    <Fragment key={index}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        <BreadcrumbLink href={`#${item}`}>{item}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
              {hasChildren ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={toggleExpand}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              ) : (
                <span className="w-6" />
              )}
            </div>
            {isExpanded && hasChildren && (
              <div className="ml-6">
                {Object.entries(node).map(([childName, childNode]) => (
                  <TreeNode
                    key={childName}
                    node={childNode}
                    path={[childName]}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )
      }
    
      return (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Category Structure</h2>
          <div className="border rounded p-2">
            <TreeNode node={categoryTree} path={[]} level={0} />
          </div>
        </div>
      )
    }

export default Tree;